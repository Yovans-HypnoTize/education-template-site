import { Box, Typography } from "@mui/material";
import latest_updates_image_1 from "../../assets/resource/latestUpdates/latest_update_image_1.png";

const LatestUpdates = () => {
  return (
    <Box>
      <title>Latest Updates – Edumaat ERP News & Announcements</title>
      <meta
        name="description"
        content="Stay informed with the latest news, product updates, and feature releases from Edumaat. See what's new in the world of education ERP solutions."
      />
      <meta
        name="keywords"
        content="Edumaat updates, new features, ERP announcements, education technology news, Edumaat latest news"
      />
      <meta name="author" content="Edumaat" />

      <Box
        sx={{
          px: { sm: 22 },
          mt: 12,
          mb: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontWeight: "bold", fontSize: 30, mb: 3 }}>
            Latest Updates
          </Typography>
          <img
            src={latest_updates_image_1}
            alt="latest updates image 1"
            style={{ height: "100%", width: "80%", borderRadius: 2 }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LatestUpdates;
