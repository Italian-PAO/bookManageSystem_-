package com.njxz.demo.service;

import com.njxz.demo.domain.Book;
import com.njxz.demo.domain.Vo.BookVo;
import com.njxz.demo.utils.page.Page;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface IBookService {

    /**
     * 根据书名查找书籍
     * @param bookName
     * @return
     */
    public List<BookVo> findBooksByBookName(String bookName);

    public List<BookVo> findBooksByAuthorName(String authorName);

    /**
     * 根据书籍种类id查找书籍,分页查找
     * @param categoryId
     * @return
     */
    public Page<BookVo> findBooksByCategoryId(int categoryId,String bookName,String bookAuthor,int pageNum);

    //分页查询
    Page<BookVo> findBooksByPage(int pageNum);

    //根据用户id删除用户
    int deleteBookById(int bookId);

    public boolean updateBook(Book book);
}
