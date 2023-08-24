import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import Link from "next/link";

interface TechItem {
  title: string;
  img: {
    src: string[];
  };
  content: {
    primary: string;
    secondary: string;
  };
}

const techItems: TechItem[] = [
  {
    title: "Node.js",
    img: { src: ["/icon/nodejs.svg"] },
    content: {
      primary: "Node.js",
      secondary: "輕巧的執行環境，能快速建立應用服務",
    },
  },
  {
    title: "React.js/Next.js",
    img: { src: ["/icon/react.svg", "/icon/next.svg"] },
    content: {
      primary: "React.js/Next.js",
      secondary: "Javascript強大的框架，可打造具互動性的網頁服務",
    },
  },
  {
    title: "Vercel",
    img: { src: ["/icon/vercel.svg"] },
    content: {
      primary: "Vercel",
      secondary: "雲服務商，輕鬆部屬Next.js應用程式而不需要管理伺服器硬體",
    },
  },
];

const Page = () => {
  return (
    <Box width="60%">
      <Grid container>
        <Grid lg={12}>Full-stack Web Developer</Grid>
        <Grid lg={6}>
          <Image src="/image/owl.jpg" alt="owl" width={500} height={500} />
        </Grid>
        <Grid lg={6}>
          <Typography variant="subtitle1">全端網頁工程師</Typography>
          <Typography variant="subtitle1">技術專長</Typography>
          <List>
            {techItems.map((t, i) => (
              <ListItem key={t.title}>
                {t.img.src.map((s) => (
                  <>
                    <ListItemIcon key={s}>
                      <Image src={s} alt={t.title} width={32} height={32} />
                    </ListItemIcon>
                    {t.img.src.length > 1 && <Divider orientation="vertical" />}
                  </>
                ))}
                <ListItemText
                  primary={t.content.primary}
                  secondary={t.content.secondary}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="subtitle1" gutterBottom>
            如何合作
          </Typography>
          <Typography variant="body1" gutterBottom>
            我們將從一個諮詢開始，了解您的需求和目標。接著，我將為您設計並開發一個專屬的網站方案，這個方案將能夠幫助您吸引更多的客戶，增強品牌形象，並提升業務效能。我的任務是幫助您實現目標，並為您提供最高品質的服務。
          </Typography>
          <Typography>
            想了解更多可查看服務項目
            <Link href="/home/service">
              <Button>現在前往</Button>
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page;
