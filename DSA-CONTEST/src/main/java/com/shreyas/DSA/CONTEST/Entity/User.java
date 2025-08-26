package com.shreyas.DSA.CONTEST.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String email;
    String password;
    String loged;
    int tabSwitch;
    int copyPaste;
    int screenLock;
    @OneToMany(mappedBy = "user")
    List<Question> questions;
    public Question getQuestion(int id) {
        for(Question question:questions) {
            if(question.getQNo()==id)
                return question;
        }
        return null;
    }
}
