package com.shreyas.DSA.CONTEST.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    int qNo;
    boolean isSolved;
    LocalTime time;
    @Column(columnDefinition = "TEXT")
    String code;
    @ManyToOne()
    User user;
    int score;
    public Question(int qNo, User user) {
        code="";
        isSolved=false;
        this.qNo=qNo;
        this.user=user;
    }
}
