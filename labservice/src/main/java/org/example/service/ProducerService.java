package org.example.service;

import org.example.App;
import org.example.dao.SampleDAO;
import org.example.entity.Sample;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

import org.example.dao.SampleDAO;
import org.example.entity.Sample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Sends Messages to the broker
 */
@Service
public class ProducerService {

    @Autowired
    private RabbitTemplate rabbitTemplate;
    @Value("${message.queue}")
    private String messageQueue;

    public Boolean sendSamples(Collection<Sample> samples){
        boolean success;
        try {
            System.out.println("Sending the index request through queue message");
            Collection<HashMap<String, Object>> message = samples.stream().map((sample -> {
                HashMap<String, Object> m = new HashMap<>();
                m.put("id", sample.getId().toString());
                m.put("name", sample.getName());
                return m;
            })).collect(Collectors.toList());
            rabbitTemplate.convertAndSend("spring-boot", message);
            success = true;
        } catch (Exception e){
            System.err.println("Exception occurred sending message. Error=" + e.toString());
            e.printStackTrace();
            success = false;
        }
        return success;
    }

}



