package org.example.entity;

public class Sample {
    private Integer id;
    private String name;
    private String status;
    private int age;

    public Sample(Integer id, String name, String status, int age){
        this.id = id;
        this.name = name;
        this.status = status;
        this.age = age;
    }

//    public Sample(){}

    public Integer getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getAge() {
        return this.age;
    }

    public void setAge(int age) {
        this.age = age;
    }

}
