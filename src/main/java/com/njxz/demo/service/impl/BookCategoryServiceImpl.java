package com.njxz.demo.service.impl;

import com.njxz.demo.domain.Book;
import com.njxz.demo.domain.BookCategory;
import com.njxz.demo.mapper.BookCategoryMapper;
import com.njxz.demo.mapper.BookMapper;
import com.njxz.demo.service.IBookCategoryService;
import com.njxz.demo.utils.page.Page;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class BookCategoryServiceImpl implements IBookCategoryService {

    @Resource
    private BookCategoryMapper bookCategoryMapper;
    @Resource
    private BookMapper bookMapper;
    @Override
    public Page<BookCategory> selectBookCategoryByPageNum(int pageNum) {
        Page<BookCategory> page=new Page<>();
        List<BookCategory> list=bookCategoryMapper.selectByPageNum((pageNum-1)*10,10);
        page.setPageSize(10);
        page.setPageNum(pageNum);
        page.setList(list);
        int recordCount=bookCategoryMapper.selectAllCount();
        int pageCount=recordCount/10;
        if(recordCount%10!=0){
            pageCount++;
        }
        page.setPageCount(pageCount);
        return page;
    }

    @Override
    public int deleteBookCategoryById(int bookCategoryId) {
        int n,count=0;
        Book book = new Book();
        book.setBookCategory(bookCategoryId);
        book.setBookName("");
        book.setBookAuthor("");
        count = bookMapper.selectBookCountByCategoryId(book);
        if(count>0){
            n=0;
        } else {
            n = bookCategoryMapper.deleteByPrimaryKey(bookCategoryId);
        }

        return n;
    }

    @Override
    public boolean updateBookCategory(BookCategory bookCategory){
        int n;
        n=bookCategoryMapper.updateByPrimaryKey(bookCategory);
        if(n>0){
            return true;
        }
        return false;
    }
}
