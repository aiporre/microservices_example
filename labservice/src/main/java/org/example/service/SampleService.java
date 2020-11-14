package org.example.service;
import org.example.dao.SampleDAO;
import org.example.entity.Sample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

/**
 * Class to access the database and execute queries
 */
@Service
public class SampleService {

    @Autowired
    private SampleDAO sampleDAO;

    public Collection<Sample> getSamples(){
        return sampleDAO.getSamples();
    }

}
