package com.shreyas.DSA.CONTEST.Repo;

import com.shreyas.DSA.CONTEST.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Long> {
    User findByEmail(String email);
}
