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
                "C:/Users/yasas/OneDrive/Desktop/PlacementPilot/backend/placementpilot/uploads/resumes/";

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
                new File(uploadDir, fileName)
                        .getAbsolutePath();
        System.out.println("Upload Directory: " + uploadDir);
        System.out.println("File Path: " + filePath);
        System.out.println("Working Directory: " + System.getProperty("user.dir"));
        File destinationFile =
                new File(filePath);

        file.transferTo(destinationFile);

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