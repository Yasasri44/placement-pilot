package com.yasasri.placementpilot.controller;

import com.yasasri.placementpilot.dto.ApplicationRequest;
import com.yasasri.placementpilot.model.Application;
import com.yasasri.placementpilot.service.ApplicationService;
import org.springframework.web.bind.annotation.*;

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
}