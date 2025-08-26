package com.shreyas.DSA.CONTEST.Repo;

import com.shreyas.DSA.CONTEST.Entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepo extends JpaRepository<Question,Long> {
}
