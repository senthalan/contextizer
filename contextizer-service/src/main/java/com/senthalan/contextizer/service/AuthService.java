package com.senthalan.contextizer.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.commons.codec.DecoderException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Date;

import static org.apache.commons.codec.binary.Hex.decodeHex;

@Service
public class AuthService {
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthService.class);

    @Value("${auth.api.key}")
    private String apiKeyString;
    @Value("${auth.issuer}")
    private String issuer;
    Key apiKey;

    @PostConstruct
    public void initialize() {
        byte[] encoded = null;
        try {
            encoded = decodeHex(apiKeyString.toCharArray());
        } catch (DecoderException e) {
            throw new RuntimeException("Unable to decode auth api key!!!");
        }
        apiKey = new SecretKeySpec(encoded, "HS256");
    }

    public String createJWT(String id, String subject, int expireInMinutes) {


        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        JwtBuilder builder = Jwts.builder().setId(id)
                .setIssuedAt(now)
                .setSubject(subject)
                .setIssuer(issuer)
                .signWith(SignatureAlgorithm.HS256, apiKey);

        Long expireInMillis = (long) (expireInMinutes * 60000);
        if (expireInMillis > 0) {
            long expMillis = nowMillis + expireInMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);
        }

        return builder.compact();
    }


    public int parseJWT(String jwt) {

        int returnCode = 200;    //OK
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(apiKey)
                    .parseClaimsJws(jwt).getBody();
            if (!issuer.equals(claims.getIssuer())) {
                returnCode = 499;  //Token Error
            }
            if (claims.getExpiration().before(new Date())) {
                returnCode = 498;   //Token Expired
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            returnCode = 499;  //Token Error
        }
        return returnCode;
    }

    public void setApiKeyString(String apiKeyString) {
        this.apiKeyString = apiKeyString;
    }

    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }
}
