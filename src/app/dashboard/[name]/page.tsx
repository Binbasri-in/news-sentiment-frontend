'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Container,
  Typography,
  Grid,
  Divider,
  CircularProgress,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';

import { fetchProfileAnalytics } from '@/lib/profiles';

const COLORS = ['#82ca9d', '#8884d8', '#FF8042']; // Positive, Neutral, Negative

export default function ProfileDashboardPage() {
  const { name: profileName } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profileName) return;

    const loadAnalytics = async () => {
      try {
        const result = await fetchProfileAnalytics(profileName as string);
        setData(result);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [profileName]);

  if (loading) {
    return (
      <Container sx={{ mt: 5, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading analytics...
        </Typography>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h6" color="error">
          Failed to load analytics data.
        </Typography>
      </Container>
    );
  }

  const pieData = [
    { name: 'Positive', value: data.sentiment_counts.positive },
    { name: 'Neutral', value: data.sentiment_counts.neutral },
    { name: 'Negative', value: data.sentiment_counts.negative },
  ];

  const sectionData = Object.entries(data.section_sentiment).map(([section, counts]: any) => ({
    section,
    ...counts,
  }));

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Sentiment Dashboard: {profileName}
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" gutterBottom>
            Overall Sentiment Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" gutterBottom>
            Sentiment by Section
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sectionData}>
              <XAxis dataKey="section" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="positive" fill={COLORS[0]} />
              <Bar dataKey="neutral" fill={COLORS[1]} />
              <Bar dataKey="negative" fill={COLORS[2]} />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" gutterBottom>
            Top Positive Articles
          </Typography>
          <List dense>
            {data.top_positive_articles.map((article: any, idx: number) => (
              <ListItem key={idx}>
                <ListItemText
                  primary={article.title}
                  secondary={`Section: ${article.section} — Score: ${article.score.toFixed(2)}`}
                />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" gutterBottom>
            Top Negative Articles
          </Typography>
          <List dense>
            {data.top_negative_articles.map((article: any, idx: number) => (
              <ListItem key={idx}>
                <ListItemText
                  primary={article.title}
                  secondary={`Section: ${article.section} — Score: ${article.score.toFixed(2)}`}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}
