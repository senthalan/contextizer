package com.senthalan.contextizer;

import static org.junit.Assert.assertEquals;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class UserTest {

    private FirefoxDriver driver;

    @Before
    public void setup(){
        driver=new FirefoxDriver();
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.get("http://127.0.0.1:3000/");
    }

    @Test
    public void loginTest(){
        driver.findElement(By.id("userEmail")).sendKeys("test@test.com");
        driver.findElement(By.id("userPassword")).sendKeys("123123");
        driver.findElement(By.id("userLogin")).click();

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        assertEquals("logged in", driver.findElement(By.id("userName")).getText(),"logged in as test@test.com");

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("mediaDropDown")).click();
        driver.findElement(By.id("574d200d44ae77f7dbe9a884")).click();

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("tagDropDown")).click();
        driver.findElement(By.id("local")).click();

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


        driver.findElement(By.id("logout")).click();
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.findElement(By.id("loginConform")).click();

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

//        assertEquals("logged out", driver.findElement(By.id("copyright")).getText(),"all rights received");



    }

    @Test
    public void registerUser(){
        driver.findElement(By.id("registerUser")).click();
        driver.findElement(By.id("email")).sendKeys("testuser@test.com");
        driver.findElement(By.id("password")).sendKeys("123123");
        driver.findElement(By.id("passConform")).sendKeys("123123");

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("registerSubmit")).click();
    }


    @After
    public void close(){
        driver.quit();
    }

}