package com.shreyas.DSA.CONTEST.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SubmitDTO {
    int questionId;
    String text;
    String language;
}
