package com.yasasri.placementpilot.repository;

import com.yasasri.placementpilot.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository
        extends JpaRepository<Application, Long> {
}