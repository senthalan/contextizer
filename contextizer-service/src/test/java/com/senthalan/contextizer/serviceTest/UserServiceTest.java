//package com.senthalan.contextizer.serviceTest;
//
//import com.senthalan.contextizer.Boot;
//import com.senthalan.contextizer.domain.User;
//import com.senthalan.contextizer.message.SignInUserResp;
//import com.senthalan.contextizer.service.UserService;
//import com.senthalan.contextizer.util.MNException;
//import org.junit.Assert;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.SpringApplicationConfiguration;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//import org.springframework.test.context.web.WebAppConfiguration;
//import org.springframework.transaction.annotation.Transactional;
//
//import static org.junit.Assert.*;
//
//
//@Transactional
//@ContextConfiguration({ "classpath:contextizer-server-context.xml"})
//public class UserServiceTest {
//
//    @Mock
//    UserService userService;
//
//    @Before
//    public void setUp() {
//        // Initialize Mockito annotated components
//        MockitoAnnotations.initMocks(this);
//    }
//
//    @Test
//    public void registerUser() throws MNException {
//
//        User user= new User();
//
//        user.email="testing";
//        user.password="123123";
//
//        SignInUserResp resp=userService.registerUser(user);
//
//
//
////        Assert.assertNotNull("failure - expected not null", resp);
////        Assert.assertEquals("failure - expected email attribute match", user.email,resp.user.email);
//    }
//
//}
