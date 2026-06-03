package com.yasasri.placementpilot.service;

import com.yasasri.placementpilot.model.Resume;
import com.yasasri.placementpilot.repository.ResumeRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;

import com.yasasri.placementpilot.model.User;
import com.yasasri.placementpilot.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    public ResumeService(
            ResumeRepository resumeRepository,
            UserRepository userRepository) {

        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
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
        resume.setUser(user);

        return resumeRepository.save(
                resume);
    }
    public java.util.List<Resume> getMyResumes() {

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

        return resumeRepository
                .findByUserId(user.getId());
    }
    public void deleteResume(Long id) {

        Resume resume =
                resumeRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Resume not found"));

        File file =
                new File(
                        resume.getFilePath());

        if(file.exists()) {

            file.delete();
        }

        resumeRepository.delete(resume);
    }
}