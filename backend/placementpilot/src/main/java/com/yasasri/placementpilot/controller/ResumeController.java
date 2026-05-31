package com.yasasri.placementpilot.controller;

import com.yasasri.placementpilot.model.Resume;
import com.yasasri.placementpilot.service.ResumeService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(
            ResumeService resumeService) {

        this.resumeService =
                resumeService;
    }

    @PostMapping("/upload")
    public Resume uploadResume(
            @RequestParam("resumeName")
            String resumeName,

            @RequestParam("file")
            MultipartFile file)
            throws IOException {

        return resumeService.uploadResume(
                resumeName,
                file
        );
    }
}