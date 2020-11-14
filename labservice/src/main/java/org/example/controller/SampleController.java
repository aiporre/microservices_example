package org.example.controller;

import org.example.entity.Sample;
import org.example.service.ProducerService;
import org.example.service.SampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.HashMap;

//@RestController
//@RequestMapping("/samples")
@Controller
public class SampleController {

    @Autowired
    private SampleService sampleService;

    @Autowired
    private ProducerService producerService;

//    @RequestMapping(method = RequestMethod.GET)
    public boolean getSamples(){
        Collection<Sample> samples = this.sampleService.getSamples();
        boolean success = producerService.sendSamples(samples);

        return success;
    }

    /**
     * Routes action field in the message
     * @param message
     */
    public void route(HashMap<String, String> message) {
        System.out.println("Routing message..." + message.toString());
        String  command = "";
        if(message.containsKey("command")){
            command = message.get("command");
        } else{
            System.out.println("No command key found. Nothing to do.");
        }
        boolean success = false;
        switch (command){
            case "getSamples":
                success = this.getSamples();
        }
        // if fail do something...
    }
}
