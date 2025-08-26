package com.shreyas.DSA.CONTEST.Configuration;

import org.springframework.context.annotation.Configuration;

@Configuration
public class ContestStart {
    boolean start;

    public boolean isStart() {
        return start;
    }

    public void setStart(boolean start) {
        this.start = start;
    }
}
