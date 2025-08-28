package com.shreyas.DSA.CONTEST.Controller;

import com.shreyas.DSA.CONTEST.DTO.UserDTO;
import com.shreyas.DSA.CONTEST.Service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("771023")
public class OwnerController {
    boolean verify(UserDTO userDTO) {
        if(userDTO.getEmail().equals("ISSA7192@gmail.com")&&userDTO.getPassword().equals("DG3866FG"))
            return true;
        return false;
    }
    @Autowired
    OwnerService ownerService;


    @PostMapping("/registerUser")
    private void registerUser(@RequestParam String email, @RequestBody UserDTO userDTO) {
        if(verify(userDTO))
            ownerService.registerUser(email);
    }

    @PutMapping("/start")
    private void startContest(@RequestBody UserDTO userDTO) {
        if(verify(userDTO))
            ownerService.start();
    }
    @PutMapping("end")
    private void endContest(@RequestBody UserDTO userDTO) {
        if(verify(userDTO))
            ownerService.stop();
    }
}
