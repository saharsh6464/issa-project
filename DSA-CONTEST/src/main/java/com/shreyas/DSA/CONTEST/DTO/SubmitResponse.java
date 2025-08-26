package com.shreyas.DSA.CONTEST.DTO;

import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SubmitResponse {
    private boolean success;   // true if all tests passed
    private String output;     // detailed logs: which tests passed/failed
    private String error;
    public SubmitResponse(String msg) {
        this.output=msg;
    }
}
