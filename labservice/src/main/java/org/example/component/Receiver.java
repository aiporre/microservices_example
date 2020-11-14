package org.example.component;

import java.util.Collection;
import java.util.HashMap;
import java.util.concurrent.CountDownLatch;

import org.example.controller.SampleController;
import org.example.entity.Sample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Receiver {
    private CountDownLatch latch = new CountDownLatch(1);

    @Autowired
    private SampleController sampleController;

    public void receiveMessage(Collection<Object> samples){
        System.out.println("SAMPLES!!!! received <" + samples + ">");
        latch.countDown();
    }

    public void receiveMessage(String message) {
        System.out.println("Simple string received <" + message + ">");
        latch.countDown();
    }

    public void receiveMessage(HashMap<String, String> message) {
        System.out.println("Hashmap string string received <" + message + ">");
        this.sampleController.route(message);
        latch.countDown();
    }

    public CountDownLatch getLatch() {
        return latch;
    }
}
