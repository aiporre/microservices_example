package org.example;
import java.util.HashMap;
import java.util.concurrent.TimeUnit;

import org.example.component.Receiver;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Runner implements CommandLineRunner {

    private final RabbitTemplate rabbitTemplate;
    private final Receiver receiver;

    public Runner(Receiver receiver, RabbitTemplate rabbitTemplate) {
        this.receiver = receiver;
        this.rabbitTemplate = rabbitTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Sending command...");
        HashMap<String, String> command = new HashMap<>();
        command.put("command", "getSamples");
        rabbitTemplate.convertAndSend(App.topicExchangeName, "foo.bar.baz", command);
        receiver.getLatch().await(10000, TimeUnit.MILLISECONDS);
    }

}
