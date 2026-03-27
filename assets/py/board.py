from pandas import DataFrame
from typing import List, Optional, Union
def t+ype_check(df: DataFrame, columns: Optional[List[str]] = None) -> Union[DataFrame, bool]:
    """
    Checks if the specified columns in the DataFrame are of type 'object' (string).
    
    Parameters:
    df (DataFrame): The DataFrame to check.
    columns (List[str], optional): The list of column names to check. If None, all columns will be checked.
    
    Returns:
    Union[DataFrame, bool]: A DataFrame with the specified columns if they are of type 'object', otherwise False.
    """
    if columns is None:
        columns = df.columns.tolist()
    
    for column in columns:
        if column not in df.columns:
            raise ValueError(f"Column '{column}' does not exist in the DataFrame.")
        if df[column].dtype != 'object':
            return False
    
    return df[columns]