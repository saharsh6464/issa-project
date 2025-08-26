package com.shreyas.DSA.CONTEST.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.shreyas.DSA.CONTEST.Configuration.ContestStart;
import com.shreyas.DSA.CONTEST.DTO.SubmitResponse;
import com.shreyas.DSA.CONTEST.DTO.UserDTO;
import com.shreyas.DSA.CONTEST.Entity.Question;
import com.shreyas.DSA.CONTEST.Entity.User;
import com.shreyas.DSA.CONTEST.Repo.QuestionRepo;
import com.shreyas.DSA.CONTEST.Repo.UserRepo;
import com.shreyas.DSA.CONTEST.Security.JwtUtil;
import com.shreyas.DSA.CONTEST.Security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.SQLOutput;
import java.sql.Struct;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;
    @Autowired
    AuthenticationManager authManager;
    @Autowired
    QuestionRepo questionRepo;
    @Autowired
    QuestionsValid questionsValid;
    @Autowired
    ContestStart contestStart;
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    String storedHash;

    public String loginUser(String email, String password) {
        User user=userRepo.findByEmail(email);
        if(user.getLoged().equals("yes"))
            return "NOPE";
        System.out.println("ID"+user.getId());
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getId(), password
                )
        );
        user.setLoged("yes");
        userRepo.save(user);
        String token = jwtUtil.generateToken(String.valueOf(user.getId()),"user");
        System.out.println(token);
        return token;
    }

    public SubmitResponse validateQuestion(int question,String code,String lang) throws JsonProcessingException {
        if(false) // made it false for the testing purpose
            return new SubmitResponse("Contest End If U think its a mistake contact ISSA team");
        UserPrincipal userPrincipal=(UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long id=Long.parseLong(userPrincipal.getUsername());
        Optional<User> user=userRepo.findById(id);
        System.out.println(question);
        if(user.isPresent()) {
            Question questionObj=user.get().getQuestion(question);
//            if(questionObj.isSolved())
//                return new SubmitResponse("U solved this question already if u want to submit optimize code contact ISSA team we will decide based on our mood");
            SubmitResponse submitResponse=null;
            if(question==1) {
                submitResponse=questionsValid.question1(code,lang);
                System.out.println("Called Question 1");
                //System.out.println(submitResponse.isSuccess()+" "+submitResponse.getError()+" "+submitResponse.getOutput());
            }
            else if(question==2) {
                submitResponse=questionsValid.question2(code,lang);
            }
            else if(question==3) {
                submitResponse=questionsValid.question3(code,lang);
            }
            else if(question==4) {
                submitResponse=questionsValid.question4(code,lang);
            }
            if(submitResponse!=null&&submitResponse.isSuccess()) {
                questionObj.setSolved(true);
                questionObj.setCode(code);
                questionObj.setTime(LocalTime.now());
                if(questionObj.isSolved())
                    questionObj.setScore(questionObj.getScore()+100);
            }
            else {
                questionObj.setScore(questionObj.getScore()-5);
            }
            questionRepo.save(questionObj);
            return submitResponse;
        }
        return null;
    }

//    public SubmitResponse validateQuestionRun(int question,String code,String lang) {
//        if(!contestStart.isStart())
//            return new SubmitResponse("Contest End If U think its a mistake contact ISSA team");
//        UserPrincipal userPrincipal=(UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        Long id=Long.parseLong(userPrincipal.getUsername());
//        Optional<User> user=userRepo.findById(id);
//        System.out.println(question);
//        if(user.isPresent()) {
//            Question questionObj=user.get().getQuestion(question);
//            if(questionObj.isSolved())
//                return new SubmitResponse("U solved this question already if u want to submit optimize code contact ISSA team we will decide based on our mood");
//            SubmitResponse submitResponse=null;
//            if(question==1) {
//                submitResponse=questionsValid.question1Run(code,lang);
//            }
//            else if(question==2) {
//                submitResponse=questionsValid.question2Run(code,lang);
//            }
//            else if(question==3) {
//                submitResponse=questionsValid.question3Run(code,lang);
//            }
//            else if(question==4) {
//                submitResponse=questionsValid.question4Run(code,lang);
//            }
//            return submitResponse;
//        }
//        return null;
//    }

    public void tabSwitch() {
        UserPrincipal userPrincipal=(UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long id=Long.parseLong(userPrincipal.getUsername());
        Optional<User> user=userRepo.findById(id);
        if(contestStart.isStart()&&user.isPresent()) {
            user.get().setScreenLock(1);
            user.get().setTabSwitch(user.get().getTabSwitch() + 1);
            userRepo.save(user.get());
        }
    }
    public void copypaste() {
        UserPrincipal userPrincipal=(UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long id=Long.parseLong(userPrincipal.getUsername());
        Optional<User> user=userRepo.findById(id);
        if(contestStart.isStart()&&user.isPresent()) {
            user.get().setScreenLock(1);
            user.get().setCopyPaste(user.get().getCopyPaste() + 1);
            userRepo.save(user.get());
        }
    }
    public boolean unlock(String unlock) {
        String rawPass=!contestStart.isStart()?"148d0d7bbccb5600344dde3e65e40b6f0fabba3ce75d500e80219194da94e723":"8089a39ba4a9bb99f4aa7ccb20485665333176ff58b50cd13756e2f95c677e35";
        this.storedHash=bCryptPasswordEncoder.encode(rawPass);
        boolean ans=bCryptPasswordEncoder.matches(unlock, storedHash);
        if(ans) {
            UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Long id = Long.parseLong(userPrincipal.getUsername());
            Optional<User> user = userRepo.findById(id);
            if (user.isPresent()) {
                user.get().setScreenLock(0);
                userRepo.save(user.get());
            }
        }
        return ans;
    }

    public boolean islock() {
        UserPrincipal userPrincipal=(UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long id=Long.parseLong(userPrincipal.getUsername());
        Optional<User> user=userRepo.findById(id);
        if(user.isPresent())
            return user.get().getScreenLock()==1;
        else
            return true;
    }
}
