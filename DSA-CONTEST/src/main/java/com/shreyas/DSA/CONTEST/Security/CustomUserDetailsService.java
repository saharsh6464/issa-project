package com.shreyas.DSA.CONTEST.Security;

import com.shreyas.DSA.CONTEST.Entity.User;
import com.shreyas.DSA.CONTEST.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    UserRepo userRepo;
    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        Long id=Long.parseLong(userId);
        User user = userRepo.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new UserPrincipal(user);
    }
}
