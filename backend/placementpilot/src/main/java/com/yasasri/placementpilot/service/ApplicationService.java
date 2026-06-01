package com.yasasri.placementpilot.service;

import com.yasasri.placementpilot.dto.ApplicationRequest;
import com.yasasri.placementpilot.enums.ApplicationStatus;
import com.yasasri.placementpilot.model.Application;
import com.yasasri.placementpilot.model.Resume;
import com.yasasri.placementpilot.repository.ApplicationRepository;
import com.yasasri.placementpilot.repository.ResumeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final ResumeRepository resumeRepository;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            ResumeRepository resumeRepository) {

        this.applicationRepository = applicationRepository;
        this.resumeRepository = resumeRepository;
    }

    public Application createApplication(
            ApplicationRequest request) {

        Resume resume =
                resumeRepository.findById(
                                request.getResumeId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Resume not found"));

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

        return applicationRepository.save(
                application);
    }
}