/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client"

import React, { useEffect, useState } from 'react';
import Loading from '@/components/loading/Loading';
import ErrorMessage from '@/components/errorMessage/errorMessage';
import { useStatusPageContext } from '@/lib/statusPage/statusContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { NetworkError, NotFoundError } from '@/lib/exceptions/errors';
import { useAuth } from '@/lib/auth/authContext';

interface ListPageProps<TItem, TFilters> {
  fetchDataFunction: (params: FetchDataParams<TFilters>) => Promise<FetchDataResult<TItem>>;
  filterComponent: React.ComponentType<FilterComponentProps<TFilters>>;
  listItemComponent: React.ComponentType<ListItemProps<TItem>>;
  breadcrumbComponent?: React.ComponentType<any>;
  noItemsComponent?: React.ComponentType<any>;
  searchPlaceholder: string;
  initialFilters: TFilters;
}

export interface FetchDataParams<TFilters> {
  page: number;
  filters: TFilters;
  search: string;
}

interface FetchDataResult<TItem> {
  data: TItem[];
  pageInfo: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
}

interface PageInfo {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

interface FilterComponentProps<TFilters> {
  filters: TFilters;
  setFilters: React.Dispatch<React.SetStateAction<TFilters>>;
  isAlwaysEmpty: boolean;
}

export interface ListItemProps<TItem> {
  item: TItem;
}

function ListPage<TItem, TFilters>({
  fetchDataFunction,
  filterComponent: FilterComponent,
  listItemComponent: ListItemComponent,
  breadcrumbComponent: BreadcrumbComponent,
  noItemsComponent: NoItemsComponent,
  searchPlaceholder,
  initialFilters,
}: ListPageProps<TItem, TFilters>) {
  const { isLoading, setIsLoading, showMessageError, setShowMessageError } = useStatusPageContext();
  const { role } = useAuth();
  const router = useRouter();

  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsList, setItemsList] = useState<TItem[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>({ totalItems: 0, totalPages: 0, currentPage: 0, itemsPerPage: 0 });
  const [inputSearchTerm, setInputSearchTerm] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<TFilters>(initialFilters);

  useEffect(() => {
    fetchItems();
  }, [filters, searchTerm, pageNumber]);

  const fetchItems = async () => {
    setIsLoading(true);

    try {
      const response = await fetchDataFunction({
        page: pageNumber,
        filters,
        search: searchTerm,
      });

      setItemsList(response.data ?? []);
      setTotalItems(response.pageInfo.totalItems ?? 0);
      setPageInfo(response.pageInfo ?? { totalItems: 0, totalPages: 0, currentPage: 0, itemsPerPage: 0 });

      if (showMessageError) {
        setShowMessageError(false);
      }
    } catch (error) {

      if (error instanceof NotFoundError) {
        setItemsList([]);
        setPageInfo({ totalItems: 0, totalPages: 0, currentPage: 0, itemsPerPage: 0 });
        setTotalItems(0);
      }

      if (error instanceof NetworkError) {
        setShowMessageError(true);
        setItemsList([]);
        setPageInfo({ totalItems: 0, totalPages: 0, currentPage: 0, itemsPerPage: 0 });
        setTotalItems(0);
      }

    } finally {
      setIsLoading(false);
    }
  };

  const changePage = (value: number) => {
    const newPageNumber = pageNumber + value;
    if (newPageNumber >= 0 && newPageNumber <= pageInfo!.totalPages) {
      setPageNumber(newPageNumber);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {showMessageError && <ErrorMessage />}

      {BreadcrumbComponent && <BreadcrumbComponent />}

      <div className="mx-auto w-full max-w-screen-lg px-8 pb-8 pt-4">
        <div className='md:grid grid-cols-4 gap-8'>
          <FilterComponent
            filters={filters}
            setFilters={setFilters}
            isAlwaysEmpty={itemsList.length === 0 && !isLoading}
          />

          <div className='col-span-3'>
            <div className='flex items-center justify-between mb-4'>
              <Input
                className='flex-grow mr-4'
                placeholder={searchPlaceholder}
                value={inputSearchTerm}
                onChange={(e) => setInputSearchTerm(e.target.value)}
              />

              <div className='flex space-x-2'>
                <Button
                  className=" bg-darkBlue w-28"
                  onClick={() => {
                    setPageNumber(0);
                    setSearchTerm(inputSearchTerm)
                  }}
                >
                  Buscar
                </Button>

                {
                  role === "Conductor" && (
                    <Button
                      className=" bg-darkBlue w-28"
                      onClick={() => {
                        router.push('/dashboard/reports/create');
                      }}
                    >
                      Nuevo Reporte
                    </Button>
                  )
                }

              </div>

            </div>

            {itemsList.length > 0 ? (
              <>
                <h6 className='text-alternGray mb-2 ml-2'>
                  Mostrando {" "}
                  {pageInfo?.currentPage! * pageInfo?.itemsPerPage! + 1} - {" "}
                  {Math.min(pageInfo?.currentPage! * pageInfo?.itemsPerPage! + pageInfo?.itemsPerPage!, pageInfo?.totalItems!)}
                  {" "}de {totalItems} resultados
                </h6>

                {itemsList.map((item) => (
                  <ListItemComponent key={(item as any).reportNumber || (item as any).id} item={item} />
                ))}

                <div className="flex items-center justify-center space-x-4">
                  <button
                    className="p-2 text-gray-500 hover:text-gray-800 disabled:text-gray-300"
                    onClick={() => changePage(-1)}
                    disabled={pageNumber === 0}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <div className="border border-gray-300 rounded-lg flex items-center justify-center w-10 h-10">
                    <p className="text-gray-800">{pageNumber + 1}</p>
                  </div>

                  <button
                    className="p-2 text-gray-500 hover:text-gray-800 disabled:text-gray-300"
                    onClick={() => changePage(1)}
                    disabled={pageNumber >= pageInfo!.totalPages - 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              NoItemsComponent ? <NoItemsComponent /> : null
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListPage;