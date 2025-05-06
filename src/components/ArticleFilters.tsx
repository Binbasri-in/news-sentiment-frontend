"use client";

import { FormEvent } from "react";
import {
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Stack,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

const CLASSIFICATIONS = ["Politics", "Technology", "Economy", "Environment"];
const SENTIMENTS = ["Positive", "Neutral", "Negative"];
const MINISTRIES = [
  "Ministry of Information and Broadcasting",
  "Ministry of Finance",
  "Ministry of Parliamentary Affairs",
  "Ministry of Law and Justice",
  "Ministry of Home Affairs",
  "Ministry of Culture",
  "Ministry of Youth Affairs and Sports",
  "Ministry of Science and Technology",
  "Ministry of External Affairs",
  "Ministry of Electronics and Information Technology",
];

interface ArticleFiltersProps {
  search: string;
  setSearch: (search: string) => void;
  classificationFilters: string[];
  setClassificationFilters: (filters: string[]) => void;
  sentimentFilters: string[];
  setSentimentFilters: (filters: string[]) => void;
  ministryFilters: string[];
  setMinistryFilters: (filters: string[]) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function ArticleFilters({
  search,
  setSearch,
  classificationFilters,
  setClassificationFilters,
  sentimentFilters,
  setSentimentFilters,
  ministryFilters,
  setMinistryFilters,
  sortBy,
  setSortBy,
  onSubmit,
}: ArticleFiltersProps) {
  const toggleFilter = (
    filterArray: string[],
    setFilterArray: (filters: string[]) => void,
    value: string
  ) => {
    if (filterArray.includes(value)) {
      setFilterArray(filterArray.filter((f) => f !== value));
    } else {
      setFilterArray([...filterArray, value]);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={3}>
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <TuneIcon />
          <Typography variant="h5">Filter Articles</Typography>
        </Stack>

        <TextField
          label="Search Articles"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
          }}
        />

        <Divider />

        <Typography variant="h6">Classification</Typography>
        <FormGroup>
          {CLASSIFICATIONS.map((item) => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  checked={classificationFilters.includes(item.toLowerCase())}
                  onChange={() =>
                    toggleFilter(classificationFilters, setClassificationFilters, item.toLowerCase())
                  }
                />
              }
              label={item}
            />
          ))}
        </FormGroup>

        <Divider />

        <Typography variant="h6">Sentiment</Typography>
        <FormGroup>
          {SENTIMENTS.map((item) => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  checked={sentimentFilters.includes(item.toLowerCase())}
                  onChange={() =>
                    toggleFilter(sentimentFilters, setSentimentFilters, item.toLowerCase())
                  }
                />
              }
              label={item}
            />
          ))}
        </FormGroup>

        <Divider />

        <Typography variant="h6">Ministry</Typography>
        <FormGroup>
          {MINISTRIES.map((ministry) => (
            <FormControlLabel
              key={ministry}
              control={
                <Checkbox
                  checked={ministryFilters.includes(ministry)}
                  onChange={() =>
                    toggleFilter(ministryFilters, setMinistryFilters, ministry)
                  }
                />
              }
              label={ministry}
            />
          ))}
        </FormGroup>

        <Divider />

        <Typography variant="h6">Sort By</Typography>
        <FormControl fullWidth>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="relevance">Relevance</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          Apply Filters
        </Button>
      </Stack>
    </form>
  );
}
