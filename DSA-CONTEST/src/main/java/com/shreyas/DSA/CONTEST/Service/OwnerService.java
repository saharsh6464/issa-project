package com.shreyas.DSA.CONTEST.Service;

import com.shreyas.DSA.CONTEST.Configuration.ContestStart;
import com.shreyas.DSA.CONTEST.Entity.Question;
import com.shreyas.DSA.CONTEST.Entity.User;
import com.shreyas.DSA.CONTEST.Repo.QuestionRepo;
import com.shreyas.DSA.CONTEST.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;

@Service
public class OwnerService {
    @Autowired
    UserRepo userRepo;
    @Autowired
    QuestionRepo questionRepo;
    @Autowired
    ContestStart contestStart;
    private static final String CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            + "abcdefghijklmnopqrstuvwxyz"
            + "0123456789"
            + "!@#$%^&*()-_=+<>?";

    private static final SecureRandom RANDOM = new SecureRandom();

    public static String generatePassword(int length) {
        StringBuilder password = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int index = RANDOM.nextInt(CHAR_SET.length());
            password.append(CHAR_SET.charAt(index));
        }
        return password.toString();
    }
    public void registerUser(String email) {
        String[] emails=email.split(":");
        for(String e:emails) {
            User user=new User();
            user.setEmail(e);
            user.setPassword(generatePassword(10));
            user.setLoged("no");
            userRepo.save(user);
            for(int i=1;i<=4;i++) {
                questionRepo.save(new Question(i,user));
            }
        }
    }
    public void start() {
        contestStart.setStart(true);
    }
    public void stop() {
        contestStart.setStart(false);
    }
}
