package org.example.dao;

import org.example.entity.Sample;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Repository
public class SampleDAO {
    private static Map<Integer, Sample> samples;

    static {
        // this is a fake database
        samples = new HashMap<Integer, Sample>();
        samples.put(1, new Sample(1, "Mary", "AOK", 75));
        samples.put(2, new Sample(2, "Albert", "TK", 25));
        samples.put(3, new Sample(3, "Mark", "TK", 15));
        samples.put(4, new Sample(4, "John", "KV", 36));
        samples.put(5, new Sample(5, "Samara", "GKV", 3));
        samples.put(6, new Sample(6, "Sagan", "AOK", 22));
        samples.put(7, new Sample(7, "Julia", "TK", 41));
    }

    public Collection<Sample> getSamples(){
        return this.samples.values();
    }
}
