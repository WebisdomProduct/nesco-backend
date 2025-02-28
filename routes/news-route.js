const express = require("express");
const router = express.Router();
const featuredAchievementsController = require("../controllers/news/featured-achivements");
const latestNewsController = require("../controllers/news/latest-news");
const photoGalleryController = require("../controllers/news/photo-gallery");
const upcomingEventsController = require("../controllers/news/upcoming-events");
const videoHighlightController = require("../controllers/news/video-highlights");

router.post(
  "/featured-achivements/create",
  featuredAchievementsController.createAchievement
);

router.get(
  "/featured-achivements/",
  featuredAchievementsController.getAllAchievements
);

router.get(
  "/featured-achivements/:id",
  featuredAchievementsController.getAchievementById
);

router.put(
  "/featured-achivements/:id",
  featuredAchievementsController.updateAchievement
);

router.delete(
  "/featured-achivements/:id",
  featuredAchievementsController.deleteAchievement
);

router.post("/latest-news/create", latestNewsController.createNews);

router.get("/latest-news/", latestNewsController.getAllNews);

router.get("/latest-news/:id", latestNewsController.getNewsById);

router.put("/latest-news/:id", latestNewsController.updateNews);

router.delete("/latest-news/:id", latestNewsController.deleteNews);

router.post("/latest-news/:id/comments", latestNewsController.addComment);

router.post("/photo-gallery/create", photoGalleryController.createPhoto);

router.get("/photo-gallery/", photoGalleryController.getAllPhotos);

router.get("/photo-gallery/:id", photoGalleryController.getPhotoById);

router.put("/photo-gallery/:id", photoGalleryController.updatePhoto);

router.delete("/photo-gallery/:id", photoGalleryController.deletePhoto);

router.post("/upcoming-event/create", upcomingEventsController.createEvent);

router.get("/upcoming-event/", upcomingEventsController.getAllEvents);

router.get("/upcoming-event/:id", upcomingEventsController.getEventById);

router.put("/upcoming-event/:id", upcomingEventsController.updateEvent);

router.delete("/upcoming-event/:id", upcomingEventsController.deleteEvent);

router.post(
  "/video-highlights/create",
  videoHighlightController.createVideoHighlight
);

router.get(
  "/video-highlights/",
  videoHighlightController.getAllVideoHighlights
);

router.get(
  "/video-highlights/:id",
  videoHighlightController.getVideoHighlightById
);

router.put(
  "/video-highlights/:id",
  videoHighlightController.updateVideoHighlight
);

router.delete(
  "/video-highlights/:id",
  videoHighlightController.deleteVideoHighlight
);

module.exports = router;
