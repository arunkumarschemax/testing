import React from 'react';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import { SearchResults } from '../SearchResults/SearchResults';
import { NotFound } from '../../../../../NotFound/NotFound';
import * as S from './SearchOverlay.styles';
import { CategoryComponents } from '../../../HeaderSearch/HeaderSearch';

interface SearchOverlayProps {
  data: CategoryComponents[] | null;
  isFilterOpen: boolean;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ data, isFilterOpen }) => {
  return (
    <S.Menu>
      <SearchFilter data={data} isOpen={isFilterOpen}>
        {(filteredResults) => (filteredResults.length > 0 ? <SearchResults results={filteredResults} /> : <NotFound />)}
      </SearchFilter>
    </S.Menu>
  );
};