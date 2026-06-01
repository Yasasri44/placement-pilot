package com.yasasri.placementpilot.controller;

import com.yasasri.placementpilot.dto.ApplicationRequest;
import com.yasasri.placementpilot.model.Application;
import com.yasasri.placementpilot.service.ApplicationService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(
            ApplicationService applicationService) {

        this.applicationService = applicationService;
    }

    @PostMapping
    public Application createApplication(
            @RequestBody ApplicationRequest request) {

        return applicationService.createApplication(
                request
        );
    }
    @GetMapping
    public List<Application> getAllApplications() {

        return applicationService.getAllApplications();
    }
    @GetMapping("/id/{id}")
    public Application getApplicationById(
            @PathVariable Long id) {

        return applicationService
                .getApplicationById(id);
    }
    @PutMapping("/{id}/status")
    public Application updateStatus(
            @PathVariable Long id,

            @RequestParam String status) {

        return applicationService
                .updateStatus(
                        id,
                        status);
    }
    @DeleteMapping("/{id}")
    public String deleteApplication(
            @PathVariable Long id) {

        applicationService
                .deleteApplication(id);

        return "Application deleted successfully";
    }
    @GetMapping("/my")
    public List<Application> getMyApplications() {

        return applicationService
                .getMyApplications();
    }
}