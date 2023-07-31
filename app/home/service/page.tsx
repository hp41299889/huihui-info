import { FC } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import ServiceCard from "@/app/component/card/service";

const Page: FC = () => {
  return (
    <Grid container rowGap={4}>
      <Grid lg={12}>
        <Box
          display="flex"
          justifyContent="center"
          height={700}
          sx={{
            backgroundImage: `url('/image/web.jpg')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Stack display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h4" fontWeight={600} color="whitesmoke">
              中小型企業、個人用網頁服務
            </Typography>
            <Typography variant="h5" color="whitesmoke">
              一站式服務，從初始的設計階段到開發，再到後期的維護與優化，
            </Typography>
            <Typography variant="h5" color="whitesmoke">
              我將為您提供全方位的支援。您只需專注於您的業務。
            </Typography>
            <Button variant="contained" sx={{ width: "25%" }}>
              了解更多
            </Button>
          </Stack>
        </Box>
      </Grid>
      <Grid lg={12}>
        <Box>
          <Grid container spacing={2} display="flex" justifyContent="center">
            <Grid lg={2.5}>
              <ServiceCard
                title="靜態網頁"
                contents={["企業形象網站", "一頁式網頁"]}
                seeExampleLink="/home/collection"
              />
            </Grid>
            <Grid lg={2.5}>
              <ServiceCard
                title="後臺管理系統"
                contents={[
                  "企業客戶管理",
                  "表單資料管理",
                  "資料庫建置",
                  "動態互動網頁",
                  "客製化功能",
                ]}
                seeExampleLink="/home/collection"
              />
            </Grid>
            <Grid lg={2.5}>
              <ServiceCard
                title="自動化程式"
                contents={["背景運行"]}
                seeExampleLink="/home/collection"
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Page;
