package com.yasasri.placementpilot.service;

import com.yasasri.placementpilot.dto.ApplicationRequest;
import com.yasasri.placementpilot.enums.ApplicationStatus;
import com.yasasri.placementpilot.model.Application;
import com.yasasri.placementpilot.model.Resume;
import com.yasasri.placementpilot.repository.ApplicationRepository;
import com.yasasri.placementpilot.repository.ResumeRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import com.yasasri.placementpilot.model.User;
import com.yasasri.placementpilot.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            ResumeRepository resumeRepository,
            UserRepository userRepository) {

        this.applicationRepository = applicationRepository;
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
    }

    public Application createApplication(
            ApplicationRequest request) {

        Resume resume =
                resumeRepository.findById(
                                request.getResumeId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Resume not found"));
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"));

        Application application =
                new Application();

        application.setCompanyName(
                request.getCompanyName());

        application.setRole(
                request.getRole());

        application.setJobDescription(
                request.getJobDescription());

        application.setStatus(
                ApplicationStatus.valueOf(
                        request.getStatus()));

        application.setAppliedDate(
                LocalDate.parse(
                        request.getAppliedDate()));

        application.setJobLink(
                request.getJobLink());

        application.setNotes(
                request.getNotes());

        application.setResume(
                resume);
        application.setUser(user);

        return applicationRepository.save(
                application);
    }
    public List<Application> getAllApplications() {

        return applicationRepository.findAll();
    }
    public Application getApplicationById(Long id) {

        return applicationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Application not found"));
    }
    public Application updateStatus(
            Long id,
            String status) {

        Application application =
                applicationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Application not found"));

        application.setStatus(
                ApplicationStatus.valueOf(status));

        return applicationRepository.save(
                application);
    }
    public void deleteApplication(Long id) {

        Application application =
                applicationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Application not found"));

        applicationRepository.delete(
                application);
    }
    public List<Application> getMyApplications() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"));

        return applicationRepository
                .findByUserId(user.getId());
    }
}