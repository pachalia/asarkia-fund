import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Pagination: NextPage<{ pages: number; link?: string; loading: any }> = ({
  pages,
  link,
  loading,
}) => {
  //Set number of pages
  const numberOfPages: number[] = [];
  for (let i = 1; i <= pages; i++) {
    numberOfPages.push(i);
  }
  const router = useRouter();
  const id = router.query._id || router.query.id || 1;

  // Current active button number
  const [currentButton, setCurrentButton] = useState(Number(id));

  // Array of buttons what we see on the page

  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    let tempNumberOfPages: any[] = [...arrOfCurrButtons];
    const dots = '...';
    if (numberOfPages.length <= 6) {
      tempNumberOfPages = numberOfPages;
    } else if (numberOfPages.length===7) {
      if(currentButton>=1 && currentButton<=3){
        tempNumberOfPages=[1,2,3,4,dots, numberOfPages.length-1, numberOfPages.length]
      }else if (currentButton===4){
        tempNumberOfPages=[1,2,3,4,5, dots, numberOfPages.length]
      }else if(currentButton===5 || currentButton===6 || currentButton===numberOfPages.length) {
        tempNumberOfPages=[1,2,dots, 4,5,6,numberOfPages.length]
      }
      // if(currentButton>=4){
      //   if(numberOfPages.length-1===currentButton){
      //     tempNumberOfPages=[1,dots,currentButton-1,currentButton,numberOfPages.length]
      //   }else if(currentButton===numberOfPages.length){
      //     tempNumberOfPages=[1, dots, numberOfPages.length-2, numberOfPages.length-1, numberOfPages.length]
      //   }else {
      //     tempNumberOfPages=[1,dots, currentButton-1, currentButton, currentButton+1, dots, numberOfPages.length]
      //   }
      // }
    }else if(numberOfPages.length>7) {
      if(currentButton>=1 && currentButton <=3){
        tempNumberOfPages=[1,2,3,4,dots, numberOfPages.length-1, numberOfPages.length]
      }else{
        if(currentButton-1===3){
          tempNumberOfPages=[1,2,3,4,5,dots,numberOfPages.length-1, numberOfPages.length]
        }else if(currentButton===numberOfPages.length){
          tempNumberOfPages=[1,2,dots,currentButton-2,currentButton-1,currentButton]
        }else if(currentButton===numberOfPages.length-1){
          tempNumberOfPages=[1,2,dots,currentButton-1, currentButton, currentButton+1]
        }else if(currentButton===numberOfPages.length-2){
          tempNumberOfPages=[1,2,dots,currentButton-1,currentButton,currentButton+1,currentButton+2]
        }else if(currentButton===numberOfPages.length-3){
          tempNumberOfPages=[1,2,dots,currentButton-1,currentButton,currentButton+1,currentButton+2,currentButton+3]
        }else{
          tempNumberOfPages=[1,2,dots,currentButton-1,currentButton,currentButton+1,dots,numberOfPages.length-1,numberOfPages.length]
        }
      }
    }
    setArrOfCurrButtons(tempNumberOfPages);
    setCurrentButton(currentButton);
  }, [currentButton]);

  return (
    <div style={{ marginBottom: 20, position: 'relative', zIndex: 9 }}>
      <div
        className={`d-flex align-items-center justify-content-center`}
        style={{ marginTop: '40px' }}
      >
        <Link
          href={`${link}/${
            currentButton !== 1 ? currentButton - 1 : currentButton
          }`}
          className={`${currentButton === 1 ? styles.disabled : ''} ${
            styles.prev_next
          }`}
          onClick={() => {
            loading(true);
            setCurrentButton(currentButton - 1);
          }}
        >
          Пред
        </Link>
        {arrOfCurrButtons.map((val, index: number) => {
          return val !== '...' && val !== currentButton ? (
            <Link
              href={`${link}/${val !== '...' ? val : currentButton}`}
              key={index}
              className={`${
                currentButton === val ? styles.active : styles.pagination
              }`}
              onClick={() => {
                loading(true);
                setCurrentButton(val);
              }}
              style={{ marginLeft: index === 0 ? 25 : 0 }}
            >
              {val}
            </Link>
          ) : (
            <div
              key={index}
              className={`${currentButton === val ? styles.active : null} ${
                styles.dot_style
              }`}
            >
              {val}
            </div>
          );
        })}
        <Link
          href={`${link}/${
            currentButton !== pages ? currentButton + 1 : currentButton
          }`}
          className={`${currentButton === pages ? styles.disabled : ''} ${
            styles.prev_next
          }`}
          onClick={() => {
            loading(true);
            setCurrentButton(currentButton + 1);
          }}
        >
          След
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
