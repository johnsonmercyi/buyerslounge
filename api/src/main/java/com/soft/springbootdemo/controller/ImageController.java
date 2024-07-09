package com.soft.springbootdemo.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j2;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Controller
@RequestMapping("/api/uploads/images")
@Log4j2
public class ImageController {

  @Value("${storage.image-dir}")
  private String imageDir;

  @GetMapping("/{filename:.+}")
  public ResponseEntity<Resource> serveFile(@PathVariable String filename) throws Exception {
    try {
      Path file = Paths.get(imageDir).resolve(filename);
      Resource resource = new UrlResource(file.toUri());
      log.info("RESOURCE: {}", resource.getURL().toString());
      if (resource.exists() || resource.isReadable()) {
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
            .body(resource);
      } else {
        throw new RuntimeException("Could not read the file!");
      }
    } catch (MalformedURLException e) {
      throw new RuntimeException("Error: " + e.getMessage());
    }
  }
}
