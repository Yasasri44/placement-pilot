package com.yasasri.placementpilot.repository;

import com.yasasri.placementpilot.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeRepository
        extends JpaRepository<Resume, Long> {
}