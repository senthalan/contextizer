package com.senthalan.contextizer;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.firefox.FirefoxDriver;

import static org.junit.Assert.assertEquals;

public class MediaTest {

    private FirefoxDriver driver;

    @Before
    public void setup(){
        driver=new FirefoxDriver();
        driver.get("http://127.0.0.1:3000/media");
    }

    @Test
    public void loginTest(){
        driver.findElement(By.id("mediaEmail")).sendKeys("testmedia@test.com");
        driver.findElement(By.id("loginpassword")).sendKeys("123123");
        driver.findElement(By.id("mediaLogin")).click();

        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        assertEquals("logged in", driver.findElement(By.id("mediaName")).getText(),"TEST");


        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("setting")).click();

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
        driver.findElement(By.id("logoutConform")).click();

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }



    @After
    public void close(){
        driver.quit();
    }

}