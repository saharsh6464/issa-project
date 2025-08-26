package com.shreyas.DSA.CONTEST.Controller;

import com.shreyas.DSA.CONTEST.DTO.SubmitDTO;
import com.shreyas.DSA.CONTEST.DTO.SubmitResponse;
import com.shreyas.DSA.CONTEST.DTO.UserDTO;
import com.shreyas.DSA.CONTEST.Service.UserService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    UserService userService;
    @PostMapping("/login")
    private String login(@RequestBody UserDTO userDTO) {
        return userService.loginUser(userDTO.getEmail(),userDTO.getPassword());
    }
    @PutMapping("/submit")
    public SubmitResponse submit(@RequestBody SubmitDTO submitDTO) {
        System.out.println(1);
        return userService.validateQuestion(submitDTO.getQuestionId(),submitDTO.getText(),submitDTO.getLanguage());
    }
    @PutMapping("/run")
    private SubmitResponse run(@RequestBody SubmitDTO submitDTO) {
        return userService.validateQuestionRun(submitDTO.getQuestionId(),submitDTO.getText(), submitDTO.getLanguage());
    }
    @PutMapping("/tabswitch")
    public void tabSwitch() {
        System.out.println("tab");
        userService.tabSwitch();
    }
    @PutMapping("/copypaste")
    public void copyPaste() {
        System.out.println("cp");
        userService.copypaste();
    }
    @PutMapping("/unlock")
    public boolean unlock(@RequestParam String pass) {
        try {

            System.out.println("unlock");
            return userService.unlock(pass);
        }
        catch (Exception e) {
            return false;
        }
    }
    @GetMapping("/islock")
    public boolean islock() {
        return userService.islock();
    }
}
