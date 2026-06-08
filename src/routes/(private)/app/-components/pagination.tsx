import { useNavigate } from '@tanstack/react-router'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type PaginationProps = {
  limit: number
  totalCount: number
  totalPages: number
  currentPage: number
}

export function Pagination({
  currentPage,
  limit,
  totalCount,
  totalPages,
}: PaginationProps) {
  const router = useNavigate()
  const perPageOptions = [20, 50, 100]

  const [page, setPage] = useState(Math.max(1, currentPage))
  const [perPage, setPerPage] = useState(Math.max(1, limit))

  const selectPerPageValue = perPageOptions.includes(perPage)
    ? String(perPage)
    : '50'

  useEffect(() => {
    setPage(Math.max(1, currentPage))
    setPerPage(Math.max(1, limit))
  }, [currentPage, limit])

  useEffect(() => {
    const safePage = Math.max(1, page)
    const safePerPage = Math.max(1, perPage)

    router({
      to: '.',
      search: { page: safePage, limit: safePerPage },
      replace: true,
    })
  }, [page, perPage, router])

  const setSelectItemPerPage = (perPage: string) => {
    const limitFormatted = Number(perPage)
    setPage(1)
    setPerPage(limitFormatted)
  }

  const handleFirstPage = () => {
    setPage(page => {
      if (page <= 1) return page
      return 1
    })

    router({
      to: '.',
      search: { page: page, limit: perPage },
      replace: true,
    })
  }

  const handlePrevPage = () => {
    setPage(page => {
      if (page <= 1) return page
      return page - 1
    })

    router({
      to: '.',
      search: { page: page, limit: perPage },
      replace: true,
    })
  }

  const handNextPage = () => {
    setPage(page => {
      if (page >= totalPages) return totalPages
      return page + 1
    })

    router({
      to: '.',
      search: { page: page, limit: perPage },
      replace: true,
    })
  }

  const handleLastPage = () => {
    setPage(totalPages)

    router({
      to: '.',
      search: { page: page, limit: perPage },
      replace: true,
    })
  }

  return (
    <div className="flex justify-between items-center gap-6">
      {/* LEFTSIDE */}
      <span className="inline-flex text-sm text-muted-foreground tracking-tight">
        Mostrando {perPage} de {totalCount} itens
      </span>

      {/* RIGHTSIDE */}
      <div className="flex justify-end items-center gap-6">
        {/* SELECT ITEMS QUANTITY */}
        <div className="flex justify-between items-center gap-2">
          <span className="inline-flex text-sm text-muted-foreground tracking-tight">
            Itens por página
          </span>

          <Select
            value={selectPerPageValue}
            onValueChange={setSelectItemPerPage}
          >
            <SelectTrigger className="text-foreground">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>

            <SelectContent align="end">
              <SelectItem value="20" className="text-foreground">
                20
              </SelectItem>
              <SelectItem value="50" className="text-foreground">
                50
              </SelectItem>
              <SelectItem value="100" className="text-foreground">
                100
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* TOTAL PAGES */}
        <span className="inline-flex text-sm text-muted-foreground tracking-tight">
          Página {currentPage} de {totalPages}
        </span>

        {/* PAGINATION */}
        <div className="flex justify-end items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleFirstPage}
            disabled={page <= 1}
          >
            <ChevronsLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevPage}
            disabled={page <= 1}
          >
            <ChevronLeftIcon />
          </Button>

          <Input
            className="w-9 h-9 text-center pointer-events-none"
            value={page}
            readOnly
          />

          <Button
            variant="outline"
            size="icon"
            onClick={handNextPage}
            disabled={page >= totalPages}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleLastPage}
            disabled={page >= totalPages}
          >
            <ChevronsRightIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
