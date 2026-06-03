package com.yasasri.placementpilot.repository;

import com.yasasri.placementpilot.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeRepository
        extends JpaRepository<Resume, Long> {

    List<Resume> findByUserId(Long userId);
}