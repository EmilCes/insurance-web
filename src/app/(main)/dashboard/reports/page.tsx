"use client"

import React from 'react';
import ListPage from './ListPage';
import FilterMenuReports from './FilterMenuReports';
import { getReports, ReportData, ReportFilters } from '@/api/reports.api';
import BreadcrumbReportsPage from './breadcrumReportsPage';
import ReportItem from './reportItem';
import NoItemsComponent from './noItemsComponent';

const ReportsPage: React.FC = () => {
  return (
    <ListPage<ReportData, ReportFilters>
      fetchDataFunction={getReports}
      filterComponent={FilterMenuReports}
      listItemComponent={ReportItem}
      breadcrumbComponent={BreadcrumbReportsPage}
      noItemsComponent={NoItemsComponent}
      searchPlaceholder="Ingrese el número de reporte"
      initialFilters={{ status: 0, startYear: 2023, endYear: 2025, page: 0 }}
    />
  );
};

export default ReportsPage;