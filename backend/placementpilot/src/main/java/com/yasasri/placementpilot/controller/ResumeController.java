package com.yasasri.placementpilot.controller;

import com.yasasri.placementpilot.model.Resume;
import com.yasasri.placementpilot.service.ResumeService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(
            ResumeService resumeService) {

        this.resumeService = resumeService;
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

    @GetMapping("/my")
    public List<Resume> getMyResumes() {

        return resumeService.getMyResumes();
    }

    @DeleteMapping("/{id}")
    public String deleteResume(
            @PathVariable Long id) {

        resumeService.deleteResume(id);

        return "Resume deleted successfully";
    }
}