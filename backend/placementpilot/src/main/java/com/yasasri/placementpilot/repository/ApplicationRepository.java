package com.yasasri.placementpilot.repository;

import com.yasasri.placementpilot.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository
        extends JpaRepository<Application, Long> {
    List<Application> findByUserId(Long userId);
}