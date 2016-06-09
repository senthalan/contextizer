//package com.senthalan.contextizer;
//
//import com.senthalan.contextizer.api.NewsApi;
//import com.senthalan.contextizer.message.MNStatus;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.InjectMocks;
//import org.springframework.context.annotation.Profile;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//import org.springframework.test.context.web.WebAppConfiguration;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.test.context.web.WebAppConfiguration;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import static org.mockito.Mockito.when;
//
//import org.junit.After;
//import org.junit.Assert;
//import org.junit.Before;
//import org.junit.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.transaction.annotation.Transactional;
//
//@RunWith(SpringJUnit4ClassRunner.class)
//@WebAppConfiguration
//@ContextConfiguration(classes = Boot.class)
//@Profile("test")
//public class NewsApiTest {
//
//    @InjectMocks
//    NewsApi newsApiTest;
//
//
//
//    @Test
//    public void shouldHaveEmptyDB() throws Exception {
//    }
//
//}