package com.njxz.demo.service.impl;

import com.njxz.demo.domain.*;
import com.njxz.demo.domain.Vo.BookVo;
import com.njxz.demo.mapper.BookMapper;
import com.njxz.demo.mapper.BorrowingBooksMapper;
import com.njxz.demo.service.IBookService;
import com.njxz.demo.utils.page.Page;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.LinkedList;
import java.util.List;

@Service
public class BookServiceImpl implements IBookService {

    @Resource
    private BookMapper bookMapper;
    @Resource
    private BorrowingBooksMapper borrowingBooksMapper;
    @Override
    public List<BookVo> findBooksByBookName(String bookName) {
        BookExample bookExample=new BookExample();
        BookExample.Criteria criteria=bookExample.createCriteria();
        bookName = "%" + bookName + "%";
        criteria.andBookNameLike(bookName);
        List<Book> books=bookMapper.selectByExample(bookExample);
        List<BookVo> bookVos=new LinkedList<>();
        if(null==books){
            return bookVos;
        }
        for(Book b:books){
            BookVo bookVo=new BookVo();
            bookVo.setBookId(b.getBookId());
            bookVo.setBookName(b.getBookName());
            bookVo.setBookAuthor(b.getBookAuthor());
            bookVo.setBookNumber(b.getBookNumber());
            bookVo.setBookPublish(b.getBookPublish());
            bookVo.setBookIntroduction(b.getBookIntroduction());
            BorrowingBooksExample borrowingBooksExample=new BorrowingBooksExample();
            BorrowingBooksExample.Criteria criteria1=borrowingBooksExample.createCriteria();
            criteria1.andBookIdEqualTo(b.getBookId());
            List<BorrowingBooks> borrowingBooks=borrowingBooksMapper.selectByExample(borrowingBooksExample);
            if(bookVo.getBookNumber()>0){
                bookVo.setIsExist("可借");
            }else{
                bookVo.setIsExist("不可借");
            }
            bookVos.add(bookVo);
        }
        return bookVos;
    }

    @Override
    public List<BookVo> findBooksByAuthorName(String author) {
        BookExample bookExample=new BookExample();
        BookExample.Criteria criteria=bookExample.createCriteria();
        criteria.andBookAuthorEqualTo(author);
        List<Book> books=bookMapper.selectByExample(bookExample);

        List<BookVo> bookVos=new LinkedList<>();
        if(null==books){
            return bookVos;
        }
        for(Book b:books){
            BookVo bookVo=new BookVo();
            bookVo.setBookId(b.getBookId());
            bookVo.setBookName(b.getBookName());
            bookVo.setBookAuthor(b.getBookAuthor());
            bookVo.setBookNumber(b.getBookNumber());
            bookVo.setBookPublish(b.getBookPublish());
            bookVo.setBookIntroduction(b.getBookIntroduction());
            BorrowingBooksExample borrowingBooksExample=new BorrowingBooksExample();
            BorrowingBooksExample.Criteria criteria1=borrowingBooksExample.createCriteria();
            criteria1.andBookIdEqualTo(b.getBookId());
            List<BorrowingBooks> borrowingBooks=borrowingBooksMapper.selectByExample(borrowingBooksExample);
            if(bookVo.getBookNumber()>0){
                bookVo.setIsExist("可借");
            }else{
                bookVo.setIsExist("不可借");
            }
            bookVos.add(bookVo);
        }
        return bookVos;
    }

    @Override
    public Page<BookVo> findBooksByCategoryId(int categoryId,String bookName,String bookAuthor, int pageNum) {
//        List<Book> books=bookMapper.selectByCategoryId(categoryId,(pageNum-1)*10,10);
        List<BookVo> bookVos=new LinkedList<>();
        Page<BookVo> page=new Page<>();
        Book book = new Book();
        if(categoryId != -1){
            book.setBookCategory(categoryId);
        }

        bookName = "%"+bookName+"%";
        book.setBookName(bookName);
        book.setBookAuthor(bookAuthor);
        List<Book> books=bookMapper.selectByExamplePage((pageNum-1)*10, book);

        if(null==books){
            page.setPageNum(1);
            page.setPageCount(1);
            return page;
        }
        for(Book b:books){
            BookVo bookVo=new BookVo();
            bookVo.setBookId(b.getBookId());
            bookVo.setBookName(b.getBookName());
            bookVo.setBookAuthor(b.getBookAuthor());
            bookVo.setBookNumber(b.getBookNumber());
            bookVo.setBookPublish(b.getBookPublish());
            bookVo.setBookIntroduction(b.getBookIntroduction());

            if(b.getBookNumber()>0){
                bookVo.setIsExist("可借");
            }else{
                bookVo.setIsExist("不可借");
            }
            bookVos.add(bookVo);
        }
        page.setList(bookVos);
        page.setPageNum(pageNum);
        page.setBookCategory(categoryId);
        page.setBookName(bookName);
        page.setBookAuthor(bookAuthor);
        page.setPageSize(10);
        int bookCount=bookMapper.selectBookCountByCategoryId(book);
        int pageCount=0;
        pageCount=bookCount/10;
        if(bookCount%10!=0){
            pageCount++;
        }
        page.setPageCount(pageCount);
        if(bookCount==0){
            page.setPageCount(1);
        }
        return page;

    }

    @Override
    public Page<BookVo> findBooksByPage(int pageNum) {
        List<Book> books=bookMapper.selectByPageNum((pageNum-1)*10,10);
        List<BookVo> bookVos=new LinkedList<>();
        Page<BookVo> page=new Page<>();
        if(null==books){
            page.setPageNum(1);
            page.setPageCount(1);
            return page;
        }
        for(Book b:books){
            BookVo bookVo=new BookVo();
            bookVo.setBookId(b.getBookId());
            bookVo.setBookName(b.getBookName());
            bookVo.setBookAuthor(b.getBookAuthor());
            bookVo.setBookNumber(b.getBookNumber());
            bookVo.setBookPublish(b.getBookPublish());
            bookVo.setBookIntroduction(b.getBookIntroduction());
            BorrowingBooksExample borrowingBooksExample=new BorrowingBooksExample();
            BorrowingBooksExample.Criteria criteria1=borrowingBooksExample.createCriteria();
            criteria1.andBookIdEqualTo(b.getBookId());
            List<BorrowingBooks> borrowingBooks=borrowingBooksMapper.selectByExample(borrowingBooksExample);
            if(b.getBookNumber()>0){
                bookVo.setIsExist("可借");
            }else{
                bookVo.setIsExist("不可借");
            }
            bookVos.add(bookVo);
        }
        page.setList(bookVos);
        page.setPageNum(pageNum);
        page.setPageSize(10);

        int userCount=bookMapper.selectBookCount();
        int pageCount=userCount/10;
        if(userCount%10!=0){
            pageCount++;
        }
        page.setPageCount(pageCount);
        return page;
    }

    @Override
    public int deleteBookById(int bookId) {
        borrowingBooksMapper.deleteByBookId(bookId);
        return bookMapper.deleteByPrimaryKey(bookId);
    }

    @Override
    public boolean updateBook(Book book) {
        if (book.getBookIntroduction() == ""){
            book.setBookIntroduction("无");
        }
        int n=bookMapper.updateByPrimaryKey(book);
        if(n>0){
            return true;
        }
        return false;
    }

}
