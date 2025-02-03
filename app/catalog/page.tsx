import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function Catalog() {
  const CAT_BREED_URL = `https://api.thecatapi.com/v1/breeds?limit=9&page=0`;
  const X_API_KEY = "x-api-key";
  const PAGINATION_COUNT = "pagination-count";

  const headers = new Headers();
  headers.append(X_API_KEY, process.env.CAT_API_KEY);

  const response = await fetch(CAT_BREED_URL, {
    headers: headers,
  });

  const breeds = await response.json();

  const BREEDS_MAX_PAGES = response.headers.get(PAGINATION_COUNT);

  return (
    <>
      <div className="w-10/12 mx-auto">
        <h1 className="text-center text-8xl">Cat-alog</h1>
        <Command>
          <CommandInput placeholder="Start typing a cat breed..." />
        </Command>
        <ul className="grid grid-cols-3 gap-4">
          {breeds.map((breed) => {
            return (
              <li key={breed.id} className="w-full">
                <Card>
                  <CardHeader>
                    <CardTitle>{breed.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center overflow-hidden h-64">
                    <Image
                      src={breed.image.url}
                      alt={`Picture of ${breed.name}`}
                      width={250}
                      height={250}
                      className="w-full h-full object-cover"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Learn more</Button>
                  </CardFooter>
                </Card>
              </li>
            );
          })}
        </ul>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{BREEDS_MAX_PAGES}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
