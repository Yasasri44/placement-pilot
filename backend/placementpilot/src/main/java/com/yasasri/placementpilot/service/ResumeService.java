package com.yasasri.placementpilot.service;

import com.yasasri.placementpilot.model.Resume;
import com.yasasri.placementpilot.repository.ResumeRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;

    public ResumeService(ResumeRepository resumeRepository) {
        this.resumeRepository = resumeRepository;
    }

    public Resume uploadResume(
            String resumeName,
            MultipartFile file)
            throws IOException {

        String uploadDir =
                "uploads/resumes/";

        File directory =
                new File(uploadDir);

        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName =
                System.currentTimeMillis()
                        + "_"
                        + file.getOriginalFilename();

        String filePath =
                uploadDir + fileName;

        file.transferTo(
                new File(filePath)
        );

        Resume resume =
                new Resume();

        resume.setResumeName(
                resumeName);

        resume.setFileName(
                fileName);

        resume.setFilePath(
                filePath);

        resume.setUploadedAt(
                LocalDateTime.now());

        return resumeRepository.save(
                resume);
    }
}